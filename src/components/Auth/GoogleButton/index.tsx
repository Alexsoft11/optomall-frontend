import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function GoogleButton() {
    const t = useTranslations("Auth")
    const router = useRouter()

    return (
        <>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);

                    const token = jwtDecode(credentialResponse?.credential as string)
                    console.log(token)
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </>
    );
}
