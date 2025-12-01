import { z } from "zod";

export const CourseCardZ = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  avgSalary: z.string(),
  icon: z.string(),
  cta: z.object({ label: z.string(), href: z.string() }),
  category: z.string(),
});
export type CourseCard = z.infer<typeof CourseCardZ>;

export const CourseIndexZ = z.object({
  courses: z.array(CourseCardZ),
});
export type CourseIndex = z.infer<typeof CourseIndexZ>;

export async function getCourseIndex() {
  const mod = await import("@/content/courses/index.json");
  return CourseIndexZ.parse(mod.default).courses;
}

export const CourseDetailZ = z.object({
  courseTitle: z.string(),
  title: z.string(),
  subtitle: z.string(),
  banner: z
    .object({
      bgImageUrl: z.string().optional(),
      youtubeId: z.string().optional(),
      applyHref: z.string(),
    })
    .optional(),
  afterCompleted: z
    .object({
      title: z.string(),
      description: z.string(),
      position: z.array(z.string()),
      companies: z.array(z.string()),
    })
    .optional(),
  whychoose: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
  faq: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),
  locationsSEO: z
    .record(
      z.string(),
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .optional(),
});
export type CourseDetailRaw = z.infer<typeof CourseDetailZ> & { slug: string };

export async function getCourseDetail(slug: string) {
  try {
    const mod = await import(`@/content/courses/${slug}.json`); // ✅ fixed prefix
    const parsed = CourseDetailZ.parse(mod.default);
    return { slug, ...parsed };
  } catch {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const list = await getCourseIndex();
  return list.map((c) => c.slug);
}

export const moduleSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  points: z.array(
    z.object({
      text: z.string(),
    })
  ),
});

export const syllabusSchema = z.array(moduleSchema);

export const rootSchema = z.object({
  syllabus: syllabusSchema,
});

export async function loadSyllabus(slug: string) {
  const mod = await import(`@/content/courses/syllabus/${slug}.json`);
  return rootSchema.parse(mod.default);
}
