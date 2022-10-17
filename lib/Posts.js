import { gql } from '@pantheon-systems/wordpress-kit';
import { client } from './WordPressClient';

export async function getLatestPosts(totalPosts) {
	const query = gql`
		query LatestPostsQuery($totalPosts: Int!) {
			posts(first: $totalPosts) {
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
		posts: { edges },
	} = await client.request(query, { totalPosts });

	return edges.map(({ node }) => node);
}

export async function getPostBySlug(slug) {
	const query = gql`
		query PostBySlugQuery($slug: ID!) {
			post(id: $slug, idType: SLUG) {
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

	const { post } = await client.request(query, { slug });

	return post;
}
