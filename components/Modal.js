import { useEffect, useState } from 'react';

export default function Modal ({ visible, setVisible, children, hideCloseButton }) {
    if (visible) return (
        <>
            <div style={{
                display: 'block',
                position: 'fixed',
                top: '0px',
                left: '0px',
                width: '100%',
                height: '100%',
                background: '#0004',
                zIndex: '1000'
            }} onClick={() => {
                setVisible(false);
            }}>

            </div>
            <div style={{
                display: 'block',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '1001',
                width: '500px',
                height: '700px',
                maxWidth: 'calc(100vw - 40px)',
                maxHeight: 'calc(100vh - 60px)',
                background: 'white',
                borderRadius: '8px'
            }}>
                {!hideCloseButton &&
                    <div style={{
                        position: 'fixed',
                        top: '0px',
                        right: '-40px',
                        width: '30px',
                        height: '30px',
                        background: 'var(--orange)',
                        zIndex: '1002',
                        borderRadius: '8px',
                        display: "flex",
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        color: 'white'
                    }} onClick={() => {
                        setVisible(false);
                    }}>
                        <span style={{ transform: 'scale(2) translateY(-1px)', fontWeight: '200' }}>×</span>
                    </div>
                }
                {children}
            </div>
        </>
    );
    return ( <>  </> )
}