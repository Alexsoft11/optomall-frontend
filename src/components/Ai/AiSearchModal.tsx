
import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Radio, Spin, List, Typography } from 'antd';
import { SendOutlined, RocketOutlined } from '@ant-design/icons';
import styles from './Ai.module.scss';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

interface AiSearchModalProps {
    visible: boolean;
    onClose: () => void;
}

import { useTranslations } from 'next-intl';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

interface AiSearchModalProps {
    visible: boolean;
    onClose: () => void;
}

import useQueryApiClient from '@/utils/useQueryApiClient';
import { useJwt } from '@/utils/useJwt';
import { LoadingSpinner } from "@/ui/Spin";

const AiSearchModal: React.FC<AiSearchModalProps> = ({ visible, onClose }) => {
    const t = useTranslations('Ai');
    const router = useRouter();
    const token = useJwt();
    const [query, setQuery] = useState('');
    const [model, setModel] = useState<'openai' | 'deepseek'>('deepseek');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: t('intro_message') }
    ]);
    const [history, setHistory] = useState<any[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // History API
    const { appendData: fetchHistory } = useQueryApiClient({
        request: { url: '/ai/history', method: 'GET', disableOnMount: true },
        onSuccess: (res) => setHistory(res.data),
    });

    // Init API
    const { appendData: initSearch } = useQueryApiClient({
        request: { url: '/ai/init', method: 'POST', disableOnMount: true },
        onSuccess: (res) => {
            const { id, keywords } = res;
            setMessages(prev => [...prev, { role: 'ai', content: t('searching', { keywords: keywords.join(', ') }) }]);

            // Navigate to search page
            setTimeout(() => {
                onClose(); // Close modal
                router.push(`/search?ai_id=${id}`);
            }, 1500);
            setLoading(false);
        },
        onError: (err) => {
            // Handle 401 specifically if needed, but generic error also works
            setMessages(prev => [...prev, { role: 'ai', content: t('error') }]);
            setLoading(false);
        }
    });

    // Fetch history on open
    useEffect(() => {
        if (visible && token) {
            fetchHistory();
        }
    }, [visible, token]);

    const handleSearch = async () => {
        if (!token) {
            // Show error message or redirect to login
            setMessages(prev => [...prev, { role: 'user', content: query }]); // Show user query
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'ai', content: t('auth_required') }]); // Need to add translation key or hardcode for now found in en.json?
            }, 500);
            setQuery('');
            return;
        }

        if (!query.trim()) return;

        setMessages(prev => [...prev, { role: 'user', content: query }]);
        setLoading(true);
        const currentQuery = query;
        setQuery('');

        initSearch({
            prompt: currentQuery,
            model: model,
            provider: '1688'
        });
    };

    const [activeTab, setActiveTab] = useState<'chat' | 'history'>('chat');

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={600}
            title={<span><RocketOutlined /> {t('modal_title')} (Beta)</span>}
            centered
        >
            <div className={styles.modalContent}>
                <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f0', marginBottom: 10 }}>
                    <div
                        onClick={() => setActiveTab('chat')}
                        style={{
                            padding: '10px 20px',
                            cursor: 'pointer',
                            borderBottom: activeTab === 'chat' ? '2px solid #ff8e00' : 'none',
                            color: activeTab === 'chat' ? '#ff8e00' : '#666',
                            fontWeight: activeTab === 'chat' ? 'bold' : 'normal'
                        }}
                    >
                        {t('tab_chat')}
                    </div>
                    <div
                        onClick={() => setActiveTab('history')}
                        style={{
                            padding: '10px 20px',
                            cursor: 'pointer',
                            borderBottom: activeTab === 'history' ? '2px solid #ff8e00' : 'none',
                            color: activeTab === 'history' ? '#ff8e00' : '#666',
                            fontWeight: activeTab === 'history' ? 'bold' : 'normal'
                        }}
                    >
                        {t('tab_history')}
                    </div>
                </div>

                {activeTab === 'chat' ? (
                    <>
                        <div className={styles.chatHistory}>
                            {!isMobile && history.length > 0 && messages.length === 1 && (
                                <div style={{ marginBottom: 20 }}>
                                    <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 10 }}>{t('history_title')}</Typography.Text>
                                    <List
                                        size="small"
                                        dataSource={history.slice(0, 3)}
                                        renderItem={(item: any) => (
                                            <List.Item
                                                className={styles.historyItem}
                                                onClick={() => {
                                                    onClose();
                                                    router.push(`/search?ai_id=${item.id}`);
                                                }}
                                            >
                                                <span style={{ marginRight: 8 }}>🕒</span> {item.prompt}
                                            </List.Item>
                                        )}
                                    />
                                    <div style={{ margin: '15px 0', borderBottom: '1px solid #eee' }}></div>
                                </div>
                            )}

                            {messages.map((msg, idx) => (
                                <div key={idx} className={`${styles.message} ${styles[msg.role]}`}>
                                    {msg.content}
                                </div>
                            ))}

                            {loading && (
                                <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                                    <LoadingSpinner size="small" />
                                </div>
                            )}
                        </div>

                        <div className={styles.controls}>
                            {/* Model Switcher Hidden 
                    <div className={styles.modelSwitcher}>
                        <Radio.Group value={model} onChange={e => setModel(e.target.value)} buttonStyle="solid">
                            <Radio.Button value="openai">{t('model_openai')}</Radio.Button>
                            <Radio.Button value="deepseek">{t('model_deepseek')}</Radio.Button>
                        </Radio.Group>
                    </div>
                    */}

                            <div className={styles.inputArea}>
                                <Input
                                    placeholder={t('placeholder')}
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    onPressEnter={handleSearch}
                                    disabled={loading}
                                    style={{ borderRadius: '8px' }}
                                />
                                {isMobile ? (
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<SendOutlined />}
                                        onClick={handleSearch}
                                        loading={loading}
                                        style={{ background: '#ff8e00', borderColor: '#ff8e00', minWidth: '40px', height: '40px' }}
                                    />
                                ) : (
                                    <Button
                                        type="primary"
                                        icon={<SendOutlined />}
                                        onClick={handleSearch}
                                        loading={loading}
                                        style={{ background: '#ff8e00', borderColor: '#ff8e00', borderRadius: '8px' }}
                                    >
                                        {t('send')}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '0 20px' }}>
                        <List
                            size="small"
                            dataSource={history}
                            renderItem={(item: any) => (
                                <List.Item
                                    className={styles.historyItem}
                                    style={{ cursor: 'pointer', padding: '12px 10px', borderRadius: '6px', marginBottom: '4px' }}
                                    onClick={() => {
                                        onClose();
                                        router.push(`/search?ai_id=${item.id}`);
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ marginRight: 12, fontSize: '16px' }}>🕒</span>
                                        <span>{item.prompt}</span>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default AiSearchModal;
