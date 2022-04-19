// const URL = `http://192.168.0.113:5000/`;
const URL = `http://192.168.0.113:1501/`

const LoginLink = URL + `api/login`;
const SignUpLink = URL + `api/registration`;

const StudyLink = URL + `api/devops/study`;
const PlanLink = URL + `api/devops/plan`;
const TopicLink = URL + `api/devops/topic`;
const LessonLink = URL + `api/devops/single`;
const TestLink = URL + `api/devops/test`;
export const Links = {
  Public: URL,
  StudyLink,
  PlanLink,
  TopicLink,
  LessonLink,
  TestLink,

  LoginLink,
  SignUpLink
}