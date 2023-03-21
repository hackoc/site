import { useRouter } from 'next/router'

export function Header ({ fileName }) {
    return (
        <div style={{
            width: '100%',
            height: '70px',
            background: 'rgba(var(--orange-3-values), 0.3)',
            display: 'flex',
        }}>
            <div style={{
            }}>
                <img src="/logo-full-light.png" style={{ margin: '10px', height: '50px' }} />
            </div>
            <div style={{
                flexGrow: 1,
            }} />
            <div style={{
                height: '35px',
                margin: '20px',
            }}>
                <p style={{
                    fontSize: '1.5rem',
                    display: 'inline-block',
                    margin: '0px',
                    padding: '0px'
                }}>{fileName}</p>
            </div>
        </div>
    )
}

export default function FileViewer () {

    const router = useRouter();
    const { file } = router.query;

    return (
        <>
            <Header fileName={file} />
            <iframe src={`/items/${file}`} style={{
                width: '100%',
                border: 'none',
                height: 'calc(100vh - 70px)',
            }}></iframe>
        </>
    )


}