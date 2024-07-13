import styled from 'styled-components';
import { Upload } from "antd";

export const StyledUpload = styled(Upload)`

.upload_btn {

.response_button__block {

    $circle-size: 40px;

    // Unfortunately, we need a wrapper element containing the fixed width for centering the button within the animation (you could also apply the width as an inline style).
    .loading-btn-wrapper {
        display: inline-block;
        width: 240px;
        height: $circle-size;

        text-align: center;
    }

    .loading-btn {
        $root: &;

        position: relative;

        display: inline-block;
        width: 100%;
        height: 100%;

        background: var(--primary-color);

        border: 0;
        border-radius: 10px;

        cursor: pointer;

        transition: all .33s ease-in-out;

        &,
        &:focus {
            outline: none;
        }

        // Styles for all states
        &--pending,
        &--success,
        &--fail {
            // Morph button to circle (width equals height)
            width: $circle-size;

            // Prevent any further clicks triggering events during animation
            pointer-events: none;
            cursor: default;

            // Hide text
            #{$root}__text {
                opacity: 0;
            }
        }

        // State "pending"
        // Show loading indicator
        &--pending:before {
            content: '';

            position: absolute;
            top: 50%;
            left: 50%;

            display: inline-block;

            // Can't use percentage here as we already show this icon during morph animation
            height: #{$circle-size * .7};
            width: #{$circle-size * .7};

            border: 3px solid rgba(255, 255, 255, .33);
            border-top-color: #fff;
            border-radius: 50%;

            animation:
                loading-btn--fade-in .33s ease,
                loading-btn--rotation .66s linear 0s infinite;
        }

        // Success state - show check icon
        &--success {

            // Use "after" pseudo to trigger new fade in animation, as "before" is already used on "--pending"
            &:after {
                content: '';

                position: absolute;
                top: 50%;
                left: 50%;

                // Simulate checkmark icon
                display: inline-block;
                height: 25%;
                width: 50%;

                border: 3px solid #fff;
                border-top-width: 0;
                border-right-width: 0;

                transform: translate(-50%, -75%) rotate(-45deg);

                animation:
                    loading-btn--fade-in .6s ease;
            }
        }

        // Fail state - show cross icon
        &--fail {

            // Use "after" pseudo to trigger new fade in animation, as "before" is already used on "--pending"
            &:after {
                content: '';

                position: absolute;
                top: 50%;
                left: 50%;

                // Simulate cross icon
                display: inline-block;
                height: 65%;
                width: 65%;

                // Using background gradient is the only solution creating a cross with a single element
                background:
                    linear-gradient(to bottom,
                        transparent 44%,
                        #fff 44%,
                        #fff 56%,
                        transparent 56%),

                    linear-gradient(to right,
                        transparent 44%,
                        #fff 44%,
                        #fff 56%,
                        transparent 56%);

                transform: translate(-50%, -50%) rotate(-45deg);

                animation:
                    loading-btn--fade-in .6s ease;
            }
        }

        // Text has to be positioned absolute in order prevent line-breaks or trimming of text when morphing button to circle.  
        &__text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            font-size: 13px;
            color: #fff;

            transition: inherit;
        }
    }

}
}
`