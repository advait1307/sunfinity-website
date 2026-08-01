import { defineField, defineType } from 'sanity'

export const jobListing = defineType({
  name: 'jobListing',
  title: 'Job Listing',
  type: 'document',
  fields: [
    defineField({
      name: 'jobId',
      title: 'Job ID',
      type: 'string',
      description: 'Unique reference, e.g. SF-2026-014',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Pune / Hybrid',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'Full-time' },
          { title: 'Contract', value: 'Contract' },
          { title: 'Part-time', value: 'Part-time' },
          { title: 'Internship', value: 'Internship' },
        ],
        layout: 'radio',
      },
      initialValue: 'Full-time',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
      description: 'Shown on the careers listing card',
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'text',
      rows: 10,
      description: 'Full role overview on the detail page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'hrManager',
      title: 'HR Manager',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'email', title: 'Email', type: 'string', validation: (Rule) => Rule.email() }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'HR Manager' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'technicalManager',
      title: 'Hiring Manager',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'email', title: 'Email', type: 'string', validation: (Rule) => Rule.email() }),
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Hiring Manager' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active (published on website)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'jobId',
      active: 'isActive',
    },
    prepare({ title, subtitle, active }) {
      return {
        title: title || 'Untitled role',
        subtitle: `${subtitle || 'No ID'}${active === false ? ' · Closed' : ''}`,
      }
    },
  },
})
