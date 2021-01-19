/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `SpeakAndLeadTM club`,
    author: `Suraj R`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.API_URL || `http://localhost:1337`,
        queryLimit: 1000, // Default to 100
        // contentTypes: [`blogs`],
        contentTypes: [`blogs`, `testimonials`],
        //If using single types place them in this array.
        singleTypes: [`home`, `contact`],
        // Possibility to login with a strapi user, when content types are not publically available (optional).
        // loginData: {
          // identifier: "",
          // password: "",
        // },
      },
    },  
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
  ],
}
