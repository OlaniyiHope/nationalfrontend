import { Layout } from "@/components/layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  ArrowRight,
  Search,
  Clock,
  Tag,
  Sparkles,
  Newspaper,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/blog-posts";
import { useState } from "react";

const categories = [
  "All",
  "Insights",
  "Research",
  "Ethics",
  "Education",
  "Development",
  "Funding",
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary to-primary/95 text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="blog-grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="0.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#blog-grid)" />
          </svg>
        </div>
        <div className="container-section relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Afrika Scholar Insights
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl">
              Elevating African scholarship through expert perspectives,
              institutional updates, and global research trends.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Category Filter */}
      <section className="border-b bg-secondary/30 top-0 z-40 backdrop-blur-md">
        <div className="container-section py-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-accent text-accent-foreground"
                      : "bg-background text-muted-foreground hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10 rounded-full bg-background border-border/50 focus:ring-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {!searchQuery && activeCategory === "All" && (
        <section className="section-padding pb-0">
          <div className="container-section">
            <Link to={`/blog/${featuredPost.slug}`} className="group">
              <Card className="overflow-hidden border-none bg-gradient-to-br from-secondary to-background p-1 hover:shadow-2xl transition-all duration-300">
                <div className="bg-background rounded-lg p-8 md:p-12 lg:flex gap-12 items-center">
                  <div className="lg:w-2/3">
                    <div className="flex items-center gap-3 text-accent font-bold text-sm mb-4 uppercase tracking-widest">
                      <Sparkles className="h-4 w-4" />
                      Featured Analysis
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 group-hover:text-accent transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 lg:mt-0 lg:w-1/3 flex justify-center">
  {featuredPost.image ? (
    <img
      src={featuredPost.image}
      alt={featuredPost.title}
      className="w-full h-64 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
    />
  ) : (
    <div className="h-48 w-48 rounded-2xl bg-accent/5 flex items-center justify-center border-2 border-dashed border-accent/20 group-hover:bg-accent/10 transition-colors">
      <Newspaper className="h-24 w-24 text-accent/20" />
    </div>
  )}
</div>
                  {/* <div className="mt-8 lg:mt-0 lg:w-1/3 flex justify-center">
                    <div className="h-48 w-48 rounded-2xl bg-accent/5 flex items-center justify-center border-2 border-dashed border-accent/20 group-hover:bg-accent/10 transition-colors">
                      <Newspaper className="h-24 w-24 text-accent/20" />
                    </div>
                  </div> */}
                </div>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container-section">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {activeCategory === "All" ? "Latest Articles" : activeCategory}
              <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded ml-2">
                {filteredPosts.length} posts
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="flex flex-col h-full card-hover bg-background border-border/50 group"
              >

                  {post.image && (
    <div className="overflow-hidden rounded-t-lg h-48">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  )}
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1 bg-accent/10 text-accent px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {post.category}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-accent transition-colors leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 bg-secondary rounded flex items-center gap-1"
                      >
                        <Tag className="h-2 w-2" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px]">
                        {post.author.charAt(0)}
                      </div>
                      {post.author}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-accent hover:text-white px-2 text-xs font-bold"
                      asChild
                    >
                      <Link to={`/blog/${post.slug}`}>
                        READ ARTICLE <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-secondary/10 rounded-3xl border-2 border-dashed border-border/50">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-bold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search query or filters
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                variant="link"
                className="text-accent mt-4"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      {/* <section className="pb-24">
        <div className="container-section">
          <Card className="bg-primary text-primary-foreground overflow-hidden border-none">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="p-10 md:p-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Never miss an insight
                </h2>
                <p className="text-lg text-primary-foreground/70 mb-8 leading-relaxed">
                  Join 10,000+ researchers, librarians, and educators receiving
                  our weekly digest on the future of African scholarship.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md">
                  <Input
                    placeholder="name@university.edu"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
                  />
                  <Button className="h-12 px-8 bg-accent hover:bg-accent/90 text-white font-bold border-none">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-primary-foreground/40 mt-4">
                  By subscribing, you agree to our Privacy Policy. No spam, only
                  knowledge.
                </p>
              </div>
              <div className="hidden lg:block h-full bg-accent/5 p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-64 w-64 bg-accent/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-64 w-64 bg-accent/5 rounded-full -ml-32 -mb-32 blur-3xl anchor" />
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-2xl bg-primary/20 backdrop-blur-sm border border-white/5 flex items-center justify-center"
                    >
                      <Newspaper className="h-12 w-12 text-white/10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section> */}
    </Layout>
  );
}
