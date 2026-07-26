import { Link } from "react-router-dom";
import { usePosts, postImage } from "@/hooks/usePosts";
import "./Special.css";

export default function Special() {
  const { posts, loading, error } = usePosts();

  const picks = posts
    .filter((p) => p.isEditorsPick)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Split into up to 4 columns, round-robin, to preserve the original 4-column shape
  const COLUMN_COUNT = 4;
  const columns: typeof picks[] = Array.from({ length: COLUMN_COUNT }, () => []);
  picks.forEach((post, i) => {
    columns[i % COLUMN_COUNT].push(post);
  });
  const nonEmptyColumns = columns.filter((col) => col.length > 0);

  return (
    <section className="newsColumns">
      {loading ? (
        <p className="newsColumns__status">Loading…</p>
      ) : error ? (
        <p className="newsColumns__status newsColumns__status--error">
          Couldn't load Special picks.
        </p>
      ) : nonEmptyColumns.length === 0 ? (
        <p className="newsColumns__status">No editor's picks yet.</p>
      ) : (
        <div className="newsColumns__grid">
          {nonEmptyColumns.map((col, i) => {
            const [featured, ...items] = col;
            return (
              <div className="newsColumn" key={i}>
                <div className="sectionTitle">
                  <span></span>
                  <h2>Editor's Pick</h2>
                  <div></div>
                </div>

                <article className="newsColumn__featured">
                  <Link to={`/single/${featured.slug}`}>
                    <img src={postImage(featured.images)} alt={featured.title} />
                    <div className="newsColumn__overlay">
                      <h3>{featured.title}</h3>
                    </div>
                  </Link>
                </article>

                <ul className="newsColumn__list">
                  {items.map((item) => (
                    <li key={item._id}>
                      <Link to={`/single/${item.slug}`}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}