
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ArticleCard } from "@/components/ArticleCard";
import { ArrowDown } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useProjects, useArticles, useAboutInfo } from "@/hooks/use-content";

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: articles, isLoading: articlesLoading } = useArticles();
  const { data: aboutInfo, isLoading: aboutLoading } = useAboutInfo();
  
  // Display at most 3 projects and articles
  const featuredProjects = projects?.slice(0, 3) || [];
  const featuredArticles = articles?.slice(0, 3) || [];

  // Improved scroll function that takes a section index
  const scrollToSection = (sectionIndex: number) => {
    const sections = document.querySelectorAll('.section-container');
    if (sections && sections[sectionIndex]) {
      sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <AnimatedSection animation="fade-in" className="relative h-screen flex items-center section-container">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="max-w-3xl md:max-w-[50%]">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                <span className="text-primary">Data Analyst</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Transforming complex data into actionable insights and elegant solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/projects">View My Work</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Get In Touch</Link>
                </Button>
              </div>
            </div>
            <div className="mt-8 md:mt-0 md:ml-auto md:translate-x-[-25%]">
              <div className="w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] md:w-[45vw] md:h-[45vw] lg:w-[35vw] lg:h-[35vw] xl:w-[30vw] xl:h-[30vw] max-w-[500px] max-h-[500px] overflow-hidden border-2 border-gray-700 relative">
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)] pointer-events-none z-10"></div>
                <img 
                  src="https://github.com/SampadaPandit/LetsTalkData_Dev/blob/master/images/Sampada_Website_Profile%20with%20BG-2.jpg?raw=true" 
                  alt="Sampada Pandit" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => scrollToSection(1)}
            aria-label="Scroll to About section"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection animation="slide-up" className="py-20 section-container relative">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading 
                title="About Me" 
                //subtitle={aboutLoading ? "Loading..." : aboutInfo?.bio?.substring(0, 120) + "..." || "Hello! I'm a data scientist and analyst passionate about turning data into meaningful insights that drive decisions."}
              />
              <p className="text-muted-foreground mb-6">
                {aboutLoading ? "" : aboutInfo?.bio || "With expertise in statistical analysis, machine learning, and data visualization, I help organizations leverage their data to solve complex problems. My approach combines technical skills with business acumen to deliver actionable results."}
              </p>
              <Button asChild>
                <Link to="/about">More About Me</Link>
              </Button>
            </div>
            <div className="bg-muted rounded-lg p-8 border">
              <div className="space-y-4">
                {aboutLoading ? (
                  <div>Loading skills...</div>
                ) : (
                  (aboutInfo?.skills || ['Data Analysis', 'Machine Learning', 'Data Visualization', 'Statistical Analysis']).slice(0, 4).map((skill, i) => (
                    <div key={i}>
                      <h3 className="font-medium">{skill}</h3>
                      <div className="h-2 w-full bg-secondary rounded-full mt-2">
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: `${95 - (i * 5)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => scrollToSection(2)}
            aria-label="Scroll to Projects section"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </AnimatedSection>

      {/* Recent Projects Section */}
      <AnimatedSection animation="slide-up" delay={200} className="py-20 bg-secondary/50 section-container relative">
        <div className="container px-6 max-w-7xl mx-auto">
          <SectionHeading 
            title="Recent Projects" 
            subtitle="Explore some of my recent data science and analytics projects."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsLoading ? (
              <div>Loading projects...</div>
            ) : featuredProjects.length > 0 ? (
              featuredProjects.map((project, index) => (
                <AnimatedSection key={project.id} animation="fade-in" delay={300 + index * 100}>
                  <ProjectCard project={project} />
                </AnimatedSection>
              ))
            ) : (
              <div>No projects found</div>
            )}
          </div>
          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => scrollToSection(3)}
            aria-label="Scroll to Articles section"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </AnimatedSection>

      {/* Recent Articles Section */}
      <AnimatedSection animation="slide-up" delay={400} className="py-20 section-container relative">
        <div className="container px-6 max-w-7xl mx-auto">
          <SectionHeading 
            title="Recent Articles" 
            subtitle="Dive into my latest articles on data science, analytics, and visualization."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesLoading ? (
              <div>Loading articles...</div>
            ) : featuredArticles.length > 0 ? (
              featuredArticles.map((article, index) => (
                <AnimatedSection key={article.id} animation="fade-in" delay={500 + index * 100}>
                  <ArticleCard article={article} />
                </AnimatedSection>
              ))
            ) : (
              <div>No articles found</div>
            )}
          </div>
          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/articles">View All Articles</Link>
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => scrollToSection(4)}
            aria-label="Scroll to CTA section"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animation="fade-in" delay={600} className="py-20 bg-accent text-accent-foreground section-container">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-lg mb-8">
              Looking for data science expertise for your next project? I'd love to hear from you and discuss how we can collaborate.
            </p>
            <Button size="lg" variant="secondary" className="w-full md:w-auto" asChild>
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
