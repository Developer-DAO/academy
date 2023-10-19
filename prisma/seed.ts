import { PrismaClient } from "@prisma/client";
// import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // const password = await hash("password123", 12);
  // const user = await prisma.user.upsert({
  //   where: { email: "admin@admin.com" },
  //   update: {},
  //   create: {
  //     email: "admin@admin.com",
  //     name: "Admin",
  //     password,
  //   },
  // });
  // console.log({ user });
  const newLesson = await prisma.lessons.create({
    data: {
      quizFileName: "quiz-eth-intro-1.json",
      projectLessonNumber: null,
      fundamentalLessonName: "eth-intro-part-1",
    },
  });
  console.log({ newLesson });
  // const deletedCompletedLog = await prisma.completedQuizzes.deleteMany({});
  // console.log({ deletedCompletedLog });
  // const completed2 = await prisma.completedQuizzes.create({
  //   data: {
  //     userId: "cll3hcuim00001wujlay766tk",
  //     lesson: "2",
  //     completed: true,
  //   },
  // });
  // console.log({ completed2 });
  // const updateLesson2 = await prisma.lessons.update({
  //   where: { id: "clm60bwug00001w43vws1c3iv" },
  //   data: {
  //     quizFileName: "quiz-lesson-2.json",
  //     lessonNumber: 2,
  //   },
  // });
  // console.log({ updateLesson2 });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
