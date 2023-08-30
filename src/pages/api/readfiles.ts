import { CONTENT_PATH } from "@/lib/constants";
import fs from "fs";
import matter from "gray-matter";
import { type NextApiRequest, type NextApiResponse } from "next";
import path from "path";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const __next__base__dirname = __dirname.split(".next")[0] as string;
    let contentDir = path.join(CONTENT_PATH);
    if (process.env.NODE_ENV === "production") {
      contentDir = path.join(__next__base__dirname, CONTENT_PATH);
    }
    const directories = fs.readdirSync(path.join(contentDir));
    const lessons: object[] = [];
    directories.reverse().map((folder) => {
      if (fs.lstatSync(path.join(contentDir, folder)).isDirectory()) {
        fs.readdirSync(path.join(contentDir, folder)).map((file) => {
          if (
            !fs.lstatSync(path.join(contentDir, folder, file)).isDirectory()
          ) {
            const markdownWithMeta = fs.readFileSync(
              path.join(contentDir, folder, file),
              "utf-8",
            );

            const { data: frontMatter } = matter(markdownWithMeta);
            lessons.push({
              path: folder,
              frontMatter,
              slug: `${file.replace(".mdx", "")}`,
            });
          }
        });
      }
    });
    res.statusCode = 200;
    res.json(lessons);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.json({ error });
  }
};

export default handler;
