
import React, { useState, useEffect } from 'react';
import { Popover } from 'antd';
import styles from './Ai.module.scss';
import AiSearchModal from './AiSearchModal';

import { useTranslations } from 'next-intl';

const AiIcon = () => {
  const t = useTranslations('Ai');
  const [modalOpen, setModalOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const content = (
    <div>
      <p>{t('popover_content_1')}</p>
      <p>{t('popover_content_2')}</p>
    </div>
  );

  const icon = (
    <div className={styles.aiIconWrapper} onClick={() => setModalOpen(true)}>
      <div className={styles.aiIcon}>
        AI
      </div>
    </div>
  );

  return (
    <>
      <Popover
        content={content}
        title={t('popover_title')}
        open={popoverOpen}
        onOpenChange={setPopoverOpen}
        placement="bottomRight"
        trigger={isMobile ? "click" : "hover"}
      >
        <div className={styles.aiIconWrapper} onClick={() => setModalOpen(true)}>
          <div className={styles.aiIcon}>
            AI
          </div>
        </div>
      </Popover>

      <AiSearchModal visible={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default AiIcon;
