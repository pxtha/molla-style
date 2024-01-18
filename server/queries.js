import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
query products(
  $searchTerm: String
  $color: [ID]
  $size: [ID]
  $brand: [ID]
  $minPrice: Float
  $maxPrice: Float
  $category: ID
  $rating: Int
  $sortBy: [String]
  $page: Int = 1
  $perPage: Int
) {
  products(
    filters: {
      and: [
        { product_name: { contains: $searchTerm } }
        { product_variants: { id: { in: $color } } }
        { product_variants: { sizes: { id: { in: $size } } } }
        { vendor: { id: { in: $brand } } }
        { price: { gte: $minPrice } }
        { price: { lte: $maxPrice } }
        { categories: { id: { eq: $category } } }
        { rating: { eq: $rating } }
      ]
    }
    sort: $sortBy
    pagination: {page: $page, pageSize: $perPage}
  ) {
    data {
      id
      attributes {
        vendor {
          data {
            attributes {
              name
            }
          }
        }
        is_new
        is_top
        stock
        product_variants {
          data {
            id
            attributes {
              color
              color_name
              color
              price
              sizes {
                data {
                  id
                  attributes {
                    name
                    slug
                  }
                }
              }
            }
          }
        }
        product_name
        description
        price
        sale_price
        end_discount_time
        images {
          data {
            attributes {
              url
              height
              width
            }
          }
        }
        categories {
          data {
            id
            attributes {
              name
              slug
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
`

export const GET_PRODUCT = gql`
           query productOne($slug: Int!, $onlyData: Boolean = false) {
        productOne(id: $slug, onlyData: $onlyData) {
            single {
                 data {
              id
              attributes {
                review
                rating
                is_new
                is_top
                stock
                product_variants {
                  data {
                    id
                    attributes {
                      price
                      color
                      color_name
                      color
                      price
                      sizes {
                        data {
                          id
                          attributes {
                            name
                            slug
                          }
                        }
                      }
                    }
                  }
                  
                }
                product_name,
                description,
                price,
                sale_price,
                end_discount_time,
                images {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                },
                categories {
                  data {
                    id,
                    attributes {
                      name
                      slug
                    } 
                  }
                }
              } 
            }
            }

            prev @skip(if: $onlyData) {
        data {
              id
              attributes {
                  review
                rating
                is_new
                is_top
                stock
                product_variants {
                  data {
                    id
                    attributes {
                      price
                      color
                      color_name
                      color
                      price
                      sizes {
                        data {
                          id
                          attributes {
                            name
                            slug
                          }
        
                        }
                      }
                    }
                  }
                  
                }
                product_name,
                description,
                price,
                sale_price,
                end_discount_time,
                images {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                },
                categories {
                  data {
                    id,
                    attributes {
                      name
                      slug
                    } 
                  }
                }
              } 
            }
            }

            next @skip(if: $onlyData) {
            data {
              id
              attributes {
                review
                rating
                is_new
                is_top
                stock
                product_variants {
                  data {
                    id
                    attributes {
                      price
                      color
                      color_name
                      color
                      price
                      sizes {
                        data {
                          id
                          attributes {
                            name
                            slug
                          }
        
                        }
                      }
                    }
                  }
                  
                }
                product_name,
                description,
                price,
                sale_price,
                end_discount_time,
                images {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                },
                categories {
                  data {
                    id,
                    attributes {
                      name
                      slug
                    } 
                  }
                }
              } 
            }
            }

            related @skip(if: $onlyData) {
               data {
              id
              attributes {
                review
                rating
                is_new
                is_top
                stock
                product_variants {
                  data {
                    id
                    attributes {
                      price
                      color
                      color_name
                      color
                      price
                      sizes {
                        data {
                          id
                          attributes {
                            name
                            slug
                          }
        
                        }
                      }
                    }
                  }
                  
                }
                product_name,
                description,
                price,
                sale_price,
                end_discount_time,
                images {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                },
                categories {
                  data {
                    id,
                    attributes {
                      name
                      slug
                    } 
                  }
                }
              } 
            }
            }
        }
    }
`

export const GET_ELEMENT_PRODUCTS = gql`
    query elementProducts {
        elementProducts {
                id
                name
                slug
                price
                sale_price
                review
                ratings
                until
                stock
                top
                featured
                new
                category {
                    name
                    slug
                }
                sm_pictures {
                    width
                    height
                    url
                }
                variants {
                    color
                    color_name
                    price
                    size {
                        name
                    }
                }
        }
    }
`


export const GET_HOME_DATA = gql`
query Home {
  home {
    data {
      attributes {
        trending {
          products {
            data {
              id
              attributes {
                is_new
                is_top
                stock
                product_variants {
                  data {
                    id
                    attributes {
                      color
                      color_name
                      color
                      price
                      sizes {
                        data {
                          id
                          attributes {
                            name
                            slug
                          }
        
                        }
                      }
                    }
                  }
                  
                }
                product_name,
                description,
                price,
                sale_price,
                end_discount_time,
                images {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                },
                categories {
                  data {
                    id,
                    attributes {
                      name
                      slug
                    } 
                  }
                }
              } 
            }
          }
        }
        deal {
          deal_of_the_day_1{
             data {
              id
              attributes {
                is_new
                is_top
                stock
                product_variants {
                  data {
                    id
                    attributes {
                      color
                      color_name
                      color
                      price
                      sizes {
                        data {
                          id
                          attributes {
                            name
                            slug
                          }
        
                        }
                      }
                    }
                  }
                  
                }
                product_name,
                description,
                price,
                sale_price,
                end_discount_time,
                images {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                },
                categories {
                  data {
                    id,
                    attributes {
                      name
                      slug
                    } 
                  }
                }
              } 
            }
          },
          deal_of_the_day_2{
   data {
              id
              attributes {
                is_new
                is_top
                stock
                product_variants {
                  data {
                    id
                    attributes {
                      color
                      color_name
                      color
                      price
                      sizes {
                        data {
                          id
                          attributes {
                            name
                            slug
                          }
        
                        }
                      }
                    }
                  }
                  
                }
                product_name,
                description,
                price,
                sale_price,
                end_discount_time,
                images {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                },
                categories {
                  data {
                    id,
                    attributes {
                      name
                      slug
                    } 
                  }
                }
              } 
            }
          }
        }
        new_arrival {
          products {
           data {
              id
              attributes {
                is_new
                is_top
                stock
                product_variants {
                  data {
                    id
                    attributes {
                      color
                      color_name
                      color
                      price
                      sizes {
                        data {
                          id
                          attributes {
                            name
                            slug
                          }
        
                        }
                      }
                    }
                  }
                  
                }
                product_name,
                description,
                price,
                sale_price,
                end_discount_time,
                images {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                },
                categories {
                  data {
                    id,
                    attributes {
                      name
                      slug
                    } 
                  }
                }
              } 
            }
          }
        }
        vendor {
          vendors {
            data {
              attributes {
                logo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`


export const GET_ELEMENT_POSTS = gql`
    query elementPosts {
        elementPosts {
            id
            author
            comments
            content
            date
            slug
            title
            type
            blog_categories {
                name
                slug
            }
            image {
                width
                height
                url
            }
        }
    }
`

export const GET_POSTS_BY_PAGE = gql`
    query postsByPage ($page: String!, $category: String) {
        postsByPage(page: $page, category: $category) {
            data {
                id
                author
                comments
                content
                date
                slug
                title
                type
                blog_categories {
                    name
                    slug
                }
                image {
                    width
                    height
                    url
                }
            }

            categories {
                name
                slug
                count
            }
        }
    }
`

export const GET_POST = gql`
    query post($slug: String!) {
        post(slug: $slug) {
            single {
                id
                author
                comments
                content
                date
                slug
                title
                type
                blog_categories {
                    name
                    slug
                }
                image {
                    width
                    height
                    url
                }
            }

            prev {
                id
                slug
                title
            }

            next {
                id
                slug
                title
            }

            related {
                id
                author
                comments
                content
                date
                slug
                title
                type
                blog_categories {
                    name
                    slug
                }
                image {
                    width
                    height
                    url
                }
            }

            categories {
                name
                slug
                count
            }
        }
    }
`