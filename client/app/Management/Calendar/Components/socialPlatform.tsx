const STYLES : Record<string, {bg: string; border: string}> = {
    facebook:  { bg: '#eff6ff', border: '#1877F2' },
    instagram: { bg: '#fdf2f8', border: '#E1306C' },
    twitter:   { bg: '#f0f9ff', border: '#1DA1F2' },
    linkedin:  { bg: '#eff6ff', border: '#0a66c2' },
    youtube:   { bg: '#fef2f2', border: '#FF0000' }, 
    tiktok:    { bg: '#fafafa', border: '#000000' },
    default:   { bg: '#3b82f6', border: '#1d4ed8' }, 
};

export const getEventStyle = (event: any) => {
    const platformKey = event.platform?.toLowerCase() || 'default';
    const theme = STYLES[platformKey] || STYLES.default;

    return {
        style: {
            backgroundColor: theme.bg,
            borderLeft: `4px solid ${theme.border}`,
            border: 'none',
            borderRadius: '4px',
            color: '#1f2937', 
            display: 'block',
            opacity: 0.9
        }
    };
};