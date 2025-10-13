import { FindOne } from "../../types"

const pageTypes = ["api::page.page"]
const pageActions = ["findMany"] // We're using findMany to find the pages, but this could be adjusted to findOne per your needs

/**
 * Registers a middleware to customize the population of related fields for page documents during Strapi queries.
 *
 * This middleware intercepts document queries for the "api::page.page" content type when the action is "findMany".
 * If the request parameters include pagination with { start: 0, limit: 1 } and a 'middlewarePopulate' array,
 * it selectively applies deep population rules for specified attributes, as defined in 'pagePopulateObject'.
 *
 * The request must contain 'middlewarePopulate' (array of string keys) in the 'params' object, which is going to be mapped to 'pagePopulateObject' attributes.
 *
 */
export const registerPopulatePageMiddleware = ({ strapi }) => {
  strapi.documents.use((context, next) => {
    if (
      pageTypes.includes(context.uid) &&
      pageActions.includes(context.action)
    ) {
      const requestParams: {
        start?: number
        limit?: number
        middlewarePopulate?: Array<string>
      } = context.params
      if (
        // This is added by Strapi regardless of whether you use pagination or start & limit attributes
        // This condition will be met if the request contains {pagination: {page: 1, pageSize: 1}}
        requestParams?.start === 0 &&
        requestParams?.limit === 1 &&
        Array.isArray(requestParams?.middlewarePopulate)
      ) {
        requestParams.middlewarePopulate
          .filter((populateAttr) =>
            Object.keys(pagePopulateObject).includes(populateAttr)
          )
          .forEach((populateAttr) => {
            context.params.populate[populateAttr] =
              pagePopulateObject[populateAttr]
          })
      }
    }

    return next()
  })
}

const pagePopulateObject: FindOne<"api::page.page">["populate"] = {
  content: {
    on: {
      "sections.one-page-helper": { populate: "*" },
      "sections.contacts": {
        populate: {
          customMapPin: {
            fields: ["alt", "width", "height", "fallbackSrc"],
            populate: {
              media: true,
            },
          },
          form: {
            populate: {
              nameField: {
                fields: ["label", "placeholder", "requiredErrorText"],
              },
              mailField: {
                fields: ["label", "placeholder", "requiredErrorText"],
              },
              businessField: {
                fields: ["label", "placeholder", "requiredErrorText"],
              },
              descriptionField: {
                fields: ["label", "placeholder", "requiredErrorText"],
              },
              submitButton: {
                fields: ["label", "href", "newTab", "variant"],
                populate: {
                  icon: {
                    fields: ["alt", "width", "height", "fallbackSrc"],
                    populate: {
                      media: true,
                    },
                  },
                },
              },
            },
          },
          cards: {
            populate: {
              description: {
                fields: ["content", "id"],
              },
            },
          },
        },
      },
      "sections.locations-view": {
        populate: {
          bookButton: {
            fields: ["label", "href", "newTab", "variant"],
            populate: {
              icon: {
                fields: ["alt", "width", "height", "fallbackSrc"],
                populate: {
                  media: true,
                },
              },
            },
          },
          seeDetailsButton: {
            fields: ["label", "href", "newTab", "variant"],
            populate: {
              icon: {
                fields: ["alt", "width", "height", "fallbackSrc"],
                populate: {
                  media: true,
                },
              },
            },
          },
        },
      },
      "sections.hero": {
        populate: {
          titles: {
            fields: ["text", "id"],
          },
          topDescription: {
            fields: ["content", "id"],
          },
          botDescription: {
            fields: ["content", "id"],
          },
          button: {
            fields: ["label", "href", "newTab", "variant"],
            populate: {
              icon: {
                fields: ["alt", "width", "height", "fallbackSrc"],
                populate: {
                  media: true,
                },
              },
            },
          },
          backgroundMedia: {
            populate: {
              image: {
                fields: ["alt", "width", "height", "fallbackSrc"],
                populate: {
                  media: {
                    fields: [
                      "url",
                      "alternativeText",
                      "width",
                      "height",
                      "mime",
                    ],
                  },
                },
              },
              video: true,
            },
          },
        },
      },
      "sections.article-content": {
        populate: {
          description: { fields: ["content", "id"] },
          medias: {
            populate: {
              image: {
                fields: ["alt", "width", "height", "fallbackSrc"],
                populate: {
                  media: {
                    fields: [
                      "url",
                      "alternativeText",
                      "width",
                      "height",
                      "mime",
                    ],
                  },
                },
              },
              video: true,
            },
          },
        },
      },
      "sections.article-column-content": {
        populate: {
          columns: {
            populate: {
              description: { fields: ["content", "id"] },
              medias: {
                populate: {
                  image: {
                    fields: ["alt", "width", "height", "fallbackSrc"],
                    populate: {
                      media: {
                        fields: [
                          "url",
                          "alternativeText",
                          "width",
                          "height",
                          "mime",
                        ],
                      },
                    },
                  },
                  video: true,
                },
              },
            },
          },
        },
      },
      "sections.carousel": {
        populate: {
          images: {
            fields: ["alt", "width", "height", "fallbackSrc"],
            populate: {
              media: {
                fields: ["url", "alternativeText", "width", "height", "mime"],
              },
            },
          },
        },
      },
      "sections.statistics": {
        populate: { items: true },
      },
      "sections.text-image": {
        populate: {
          title: { fields: ["content", "id"] },
          description: { fields: ["content", "id"] },
          image: {
            fields: ["alt", "width", "height", "fallbackSrc"],
            populate: {
              media: {
                fields: ["url", "alternativeText", "width", "height", "mime"],
              },
            },
          },
          items: {
            populate: {
              description: { fields: ["content", "id"] },
            },
          },
        },
      },
      "sections.main-locations": {
        populate: {
          title: { fields: ["content", "id"] },
          description: { fields: ["content", "id"] },
          note: { fields: ["content", "id"] },
          buttons: {
            fields: ["label", "href", "newTab", "variant"],
            populate: {
              icon: {
                fields: ["alt", "width", "height", "fallbackSrc"],
                populate: {
                  media: true,
                },
              },
            },
          },
        },
      },
      "sections.time-line": {
        populate: {
          items: {
            fields: ["title", "id"],
            populate: { description: { fields: ["content", "id"] } },
          },
        },
      },
      "sections.text": {
        populate: {
          description: { fields: ["content", "id"] },
          buttons: {
            fields: ["label", "href", "newTab", "variant"],
            populate: {
              icon: {
                fields: ["alt", "width", "height", "fallbackSrc"],
                populate: {
                  media: true,
                },
              },
            },
          },
        },
      },
      "sections.team": {
        populate: {
          description: { fields: ["content", "id"] },
          items: {
            populate: {
              photo: {
                fields: ["alt", "width", "height", "fallbackSrc"],
                populate: {
                  media: true,
                },
              },
            },
          },
        },
      },
      "sections.solutions": {
        populate: {
          description: { fields: ["content", "id"] },
          note: { fields: ["content", "id"] },
          items: {
            populate: {
              description: { fields: ["content", "id"] },
              image: {
                fields: ["alt", "width", "height", "fallbackSrc"],
                populate: {
                  media: true,
                },
              },
            },
          },
        },
      },
      "sections.news": {
        populate: {
          button: {
            fields: ["label", "href", "newTab", "variant"],
            populate: {
              icon: {
                fields: ["alt", "width", "height", "fallbackSrc"],
                populate: {
                  media: true,
                },
              },
            },
          },
        },
      },
      "sections.industries": {
        populate: {
          description: { fields: ["content", "id"] },
          title: { fields: ["content", "id"] },
          items: {
            populate: {
              icon: {
                fields: ["alt", "width", "height", "fallbackSrc"],
                populate: {
                  media: true,
                },
              },
              image: {
                fields: ["alt", "width", "height", "fallbackSrc"],
                populate: {
                  media: true,
                },
              },
            },
          },
        },
      },
      "sections.ideal-locations": {
        populate: {
          description: { fields: ["content", "id"] },
          note: { fields: ["content", "id"] },
          video: true,
          items: {
            populate: {
              description: { fields: ["content", "id"] },
              image: {
                fields: ["alt", "width", "height", "fallbackSrc"],
                populate: {
                  media: true,
                },
              },
            },
          },
        },
      },
      "sections.banner": {
        populate: {
          topDescription: { fields: ["content", "id"] },
          title: { fields: ["content", "id"] },
          backgroundImage: {
            fields: ["alt", "width", "height", "fallbackSrc"],
            populate: {
              media: true,
            },
          },
          button: {
            fields: ["label", "href", "newTab", "variant"],
            populate: {
              icon: {
                fields: ["alt", "width", "height", "fallbackSrc"],
                populate: {
                  media: true,
                },
              },
            },
          },
        },
      },
      "sections.articles-collection": {
        fields: ["searchPlaceholder", "filterPlaceholder", "id", "type"],
      },
    },
  },
  seo: {
    populate: {
      metaImage: true,
      twitter: { populate: { images: true } },
      og: { populate: { image: true } },
    },
  },
}
