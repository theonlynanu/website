import { defineDocumentType, makeSource } from 'contentlayer'
import rehypeSlug from 'rehype-slug'

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
    slug: {
        type: 'string',
        resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    slugAsParamgs: {
        type: 'string',
        resolve: (post) => post._raw.flattenedPath.split('/').slice(1).join('/')
    },
}

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `posts/`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: false,
        },
        publishedAt: {
            type: 'date',
            required: true,
        },
        isPublished: {
            type: 'boolean',
            required: true
        },
    },
    computedFields,
}))

export default makeSource({
    contentDirPath: './content',
    documentTypes: [Post],
    mdx: {
        reHypePlugins: [
            rehypeSlug,
        ]
    }
})