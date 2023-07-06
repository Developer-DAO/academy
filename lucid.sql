CREATE TABLE "lessons_quizzes" (
  "id" <type>,
  "title" <type>,
  "" <type>
);

CREATE TABLE "students" (
  "id" <type>,
  "id_account_fk" <type>,
  "bio" <type>,
  "tw_url" <type>,
  "github_url" <type>
);

CREATE TABLE "questions" (
  "" <type>,
  "" <type>,
  "" <type>
);

CREATE TABLE "checkpoint_questions" (
  "id" <type>,
  "title" <type>,
  "" <type>
);

CREATE TABLE "warmup_questions" (
  "id" <type>,
  "title" <type>,
  "" <type>,
  "" <type>
);

CREATE TABLE "accounts" (
  "id" <type>,
  "name" <type>,
  "lastname" <type>,
  "email" <type>,
  "address" <type>
);

CREATE TABLE "lessons" (
  "id" <type>,
  "title" <type>,
  "id_wup_fk" <type>,
  "id_chk_fk" <type>,
  "id_quiz_fk" <type>,
  "" <type>
);

CREATE TABLE "test_x_student" (
  "id" <type>,
  "id_student_fk" <type>,
  "id_element_fk" <type>,
  "started_at" <type>,
  "ended_at" <type>,
  "" <type>,
  "completed" <type>,
  CONSTRAINT "FK_test_x_student.id_element_fk"
    FOREIGN KEY ("id_element_fk")
      REFERENCES "checkpoint_questions"("id"),
  CONSTRAINT "FK_test_x_student.id_element_fk"
    FOREIGN KEY ("id_element_fk")
      REFERENCES "lessons_quizzes"("id"),
  CONSTRAINT "FK_test_x_student.id_student_fk"
    FOREIGN KEY ("id_student_fk")
      REFERENCES "a"("id"),
  CONSTRAINT "FK_test_x_student.id_element_fk"
    FOREIGN KEY ("id_element_fk")
      REFERENCES "warmup_questions"("id"),
  CONSTRAINT "FK_test_x_student.id_element_fk"
    FOREIGN KEY ("id_element_fk")
      REFERENCES "lessons"("id")
);

CREATE TABLE "time_registry" (
  "id" <type>,
  "started_at" <type>,
  "ended_at" <type>,
  "registry_type" <type>
);