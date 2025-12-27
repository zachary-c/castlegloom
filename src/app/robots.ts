import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: ['GPTBot', 'Google-Extended', 'PetalBot', 'Applebot-Extended', 'MJ12bot', 'SemrushBot',
					'SemrushBot-BA', 'SemrushBot-SI', 'SemrushBot-SWA', 'SemrushBot-CT', 'SemrushBot-COUB', 'Cloud-CDN-Google (GFE/2.0)'],
				disallow: '/',
			},/* 
            {
                userAgent: ['Bingbot'],
                crawlDelay: 20
            }, 
            {
                userAgent: ["dotbot", 'SiteAuditBot', 'SplitSignalBot'],
                crawlDelay: 20,
            },*/
			{
				userAgent: '',
				disallow: '/api/',
				crawlDelay: 5,
			},
			{
				userAgent: '',
				disallow: '/annual',
				crawlDelay: 5,
			}
		],
	}
}
