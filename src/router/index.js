import LoginForm from "@/components/LoginForm.vue";
import TaskList from "@/components/TaskList.vue";
import ViewTask from "@/components/ViewTask.vue";
import NewTaskForm from "@/components/NewTaskForm.vue";
import CreateUser from "@/components/CreateUser.vue";
import UpdatePassword from "@/components/UpdatePassword.vue";
import ForgotPassword from "@/components/ForgotPassword.vue";
import MakeReport from "@/components/MakeReport.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/login', component: LoginForm },
    { path: '/all-tasks', component: TaskList },
    { path: '/my-tasks', component: TaskList },
    { path: '/task/:id', component: ViewTask },
    { path: '/new-task', component: NewTaskForm },
    { path: '/create-user', component: CreateUser },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/update-password', component: UpdatePassword },
    { path: '/make-report', component: MakeReport },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
