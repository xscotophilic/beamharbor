import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signIn, signOut } from '../../actions';

const GoogleAuth = () => {
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);
    const dispatch = useDispatch();
    const googleButton = useRef(null);

    const handleCredentialResponse = (response) => {
        try {
            const credential = response.credential;
            const payload = JSON.parse(atob(credential.split('.')[1]));
            const userId = payload.sub;
            dispatch(signIn(userId));
        } catch (error) {
            console.error('Error decoding JWT:', error);
        }
    };

    const onSignOutClick = () => {
        if (window.google) {
            window.google.accounts.id.disableAutoSelect();
        }
        dispatch(signOut());
    };

    useEffect(() => {
        const initializeAndRender = () => {
            if (!window.google || !googleButton.current) {
                return;
            }

            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
            });

            if (!isSignedIn) {
                if (googleButton.current.childElementCount === 0) {
                    window.google.accounts.id.renderButton(googleButton.current, {
                    theme: 'filled_black',
                    size: 'medium',
                    type: 'standard',
                    shape: 'rectangular',
                    text: 'signin',
                });
                }
            }
        };

        const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        if (script) {
            script.onload = initializeAndRender;
        }

        if (window.google) {
            initializeAndRender();
        }
    }, [isSignedIn]);

    const renderAuthButton = () => {
        if (isSignedIn) {
            return (
                <button className="ui secondary google button" onClick={onSignOutClick}>
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return <div ref={googleButton}></div>;
        }
    };

    return renderAuthButton();
};

export default GoogleAuth;
