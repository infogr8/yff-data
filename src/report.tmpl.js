export const layout = 'report.njk';
export const tags = ['report'];

/**
 * Generator function which creates a page per report data object.
 * 
 * The report object appears as a object of report definitions defined with a key.
 * 
 * @param { reports:  } options
 */

export default function* ({ reports }) {
  for (const [reportSlug, report] of Object.entries(reports)) {
    const url = `/reports/${reportSlug}/`;

    if (report.sections !== undefined ) {
      for (const [sectionIndex, section] of Object.entries(report.sections)) {
        yield {
          url: `${url}${section.title}/`,
          report: url,
          layout: 'section.njk',
          tags: ['section'],
          index: sectionIndex,
          ...section,
        }
      }  
    }
    yield {
      url,
      ...report,
    }
  }
}