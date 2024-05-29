import styled from 'styled-components';
import { Tabs } from "antd";

export const StyledTabs = styled(Tabs)`
&.navigation_btn {
    
    .ant-tabs-tab {
        padding: 10px;
        margin: 0px !important;

        color: var(--black-color);
        font-size: var(--paragraph);
        font-weight: 400;
    }

    .ant-tabs-tab-active {
        div {
            color: var(--primary-color) !important;
        }
    }

    .ant-tabs-ink-bar {
        display: none;
    }

    .ant-tabs-content-holder {
        border: none;
        margin: 0px;
    }

    .ant-tabs-nav-list {
        padding-right: 85px;
        overflow-y: auto;
        max-width: 100%;
        max-height: 75vh;

        @media (max-width:970px) {
            padding-right: 45px;
        }

        &::-webkit-scrollbar {
            width: 15px;
            background: var(--light-grey-3);
            padding: 3px !important;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--grey-mid-color);
            border: 3px solid var(--light-grey-3);
        }
    }
    
    .ant-tabs-nav-wrap {
        &:before {
            display: none;
        }

        &:after {
            display: none;
        }
    }

    .ant-tabs-nav-more {
        display: none;
    }
}

&.products_tab {
    .ant-tabs-tab-btn {
        color: var(--black-color);
        font-size: var(--paragraph-two);
        font-weight: 400;
    }
    
    .ant-tabs-tab-active .ant-tabs-tab-btn {
        color: var(--black-color);
        font-weight: 400;
        text-shadow: none;
    }

    .ant-tabs-ink-bar {
        height: 1px;
        background-color: var(--black-color);
    }

    .ant-tabs-nav-wrap::before {
        display: none;
    }
}
`