/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Lesson {
  frontMatter: any;
  slug: string;
  path: string;
  completed?: boolean;
}
export interface Lessons {
  lessons: {
    frontMatter: any;
    slug: string;
  }[];
}

export interface IFormatedLessons {
  projects: Project[];
  fundamentals: Fundamental[];
}

export interface Fundamental {
  path: Path;
  frontMatter: FundamentalFrontMatter;
  slug: string;
}

export interface FundamentalFrontMatter {
  title: string;
  description: string;
  icons: string[];
  authors?: string[];
  i18n?: string;
  author?: string[] | string;
}

export enum Path {
  Fundamentals = "fundamentals",
}

export interface Project {
  path: string;
  frontMatter: ProjectFrontMatter;
  slug: string;
  completed?: boolean;
}

export interface EthIntro {
  path: string;
  frontMatter: ProjectFrontMatter;
  slug: string;
  completed?: boolean;
}

export interface ProjectFrontMatter {
  title: string;
  description: string;
  icons: string[];
  i18n?: string;
  author?: string;
}
