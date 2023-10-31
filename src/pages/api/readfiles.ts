import { CONTENT_PATH } from "@/lib/constants";
import fs from "fs";
import matter from "gray-matter";
import { type NextApiRequest, type NextApiResponse } from "next";
import path from "path";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const dir = path.resolve("./", CONTENT_PATH);
    const directories = fs.readdirSync(dir);
    const lessons: object[] = [];
    directories.reverse().map((folder) => {
      if (fs.lstatSync(path.join(dir, folder)).isDirectory()) {
        fs.readdirSync(path.join(dir, folder)).map((file) => {
          if (!fs.lstatSync(path.join(dir, folder, file)).isDirectory()) {
            const markdownWithMeta = fs.readFileSync(
              path.join(dir, folder, file),
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
