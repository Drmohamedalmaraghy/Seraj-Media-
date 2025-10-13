import { Container } from "@/components/elementary/Container"
import { ErrorBoundary } from "@/components/elementary/ErrorBoundary"
import { Section } from "@/components/elementary/Section"
import { ContentItem, PageContentComponents } from "@/components/page-builder"
import ArticleNavigation from "@/components/page-builder/components/sections/article/ArticleNavigation"

export function Article({ block }: { block: ContentItem[] }) {
  return (
    <Section>
      <Container className="flex-col gap-8 lg:flex-row lg:gap-15" size="2xl">
        <ArticleNavigation block={block} />

        <div className="flex flex-col gap-[30px]">
          {block.map((comp: ContentItem, index) => {
            const Component = PageContentComponents[comp.__component]
            const key = `article-text-${comp.id}`
            return (
              Component && (
                <ErrorBoundary key={key}>
                  <Component id={`article-anchor-${index}`} component={comp} />
                </ErrorBoundary>
              )
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

Article.displayName = "Article"

export default Article
