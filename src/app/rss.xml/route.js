import RSS from "rss";

import { BLOG_DESCRIPTION, BLOG_TITLE } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";

export async function GET(request) {
  const siteUrl = request.nextUrl.origin;
  const blogPosts = await getBlogPostList();

  const feedOptions = {
    title: `${BLOG_TITLE} | RSS Feed`,
    description: BLOG_DESCRIPTION,
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
  };

  const feed = new RSS(feedOptions);

  blogPosts.map((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      url: `${siteUrl}/${post.slug}`,
      date: post.publishedOn,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
