const path = require('path')

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
	const result = await graphql(`
		{
			allStrapiBlogs {
				nodes {
					slug
				}
			}
		}
	`)

	result.data.allStrapiBlogs.nodes.forEach(node => {
		actions.createPage({
			path: `/blog/${node.slug}`,
			component: path.resolve(`src/templates/BlogTpl.js`),
			context: {
				slug: node.slug
			}
		})
	})
}