import React from "react";
import Post from "../post/Post";

export default function MainSection() {
  return (
    <>
      <main className={styles.middleMain}>
        <Stories />
        {posts &&
          posts.map((post) => (
            <article key={post.id} className={styles.postArticle}>
              <Post post={post} />
            </article>
          ))}
      </main>
    </>
  );
}
