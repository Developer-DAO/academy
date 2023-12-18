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
      quizFileName: "quiz-eth-intro-2.json",
      projectLessonNumber: null,
      fundamentalLessonName: "eth-intro-part-2",
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
  //   where: { id: "clpyducct00001w252m1t8im2" },
  //   data: {
  //     quizFileName: "quiz-eth-intro-3.json",
  //     fundamentalLessonName: "eth-intro-part-3",
  //     projectLessonNumber: null,
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
