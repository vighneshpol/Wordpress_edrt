import { gql } from '@pantheon-systems/wordpress-kit';
import { client } from './WordPressClient';

export async function getLatestPages(totalPages) {
	const query = gql`
		query LatestPagesQuery($totalPages: Int!) {
			pages(first: $totalPages) {
				edges {
					node {
						id
						uri
						title
						featuredImage {
							node {
								altText
								sourceUrl
							}
						}
					}
				}
			}
		}
	`;

	const {
		pages: { edges },
	} = await client.request(query, { totalPages });

	return edges.map(({ node }) => node);
}

export async function getPageByUri(uri) {
	const query = gql`
		query PageByURIquery($uri: ID!) {
			page(id: $uri, idType: URI) {
				title
				date
				featuredImage {
					node {
						altText
						sourceUrl
					}
				}
				content
			}
		}
	`;

	const { page } = await client.request(query, { uri });

	return page;
}
