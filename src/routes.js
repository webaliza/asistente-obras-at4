import InitPage from './pages/InitPage.vue';
import SettingsPage from './pages/SettingsPage.vue';
import LoginPage from './pages/LoginPage.vue';
import HomePage from './pages/HomePage.vue';
import ProjectsPage from './pages/ProjectsPage.vue';
import ChaptersPage from './pages/ChaptersPage.vue';
import EntriesPage from './pages/EntriesPage.vue';
import HoursFormPage from './pages/HoursFormPage.vue';
import PlanningPage from './pages/PlanningPage.vue';
import CalendarPage from './pages/CalendarPage.vue';
import WorkersPage from './pages/WorkersPage.vue';
import HistoryPage from './pages/HistoryPage.vue';
import ModifySignInPage from './pages/ModifySignInPage.vue';
import NotFoundPage from './pages/not-found.vue';
import PanelRightPage from './pages/panel-right.vue';

export default [
    {
        path: '/',
        component: InitPage
    },
    {
        path: '/settings',
        component: SettingsPage
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/home',
        component: HomePage
    },
    {
        path: '/projects',
        component: ProjectsPage
    },
    {
        path: '/chapters',
        component: ChaptersPage
    },
    {
        path: '/entries',
        component: EntriesPage
    },
    {
        path: '/hours-form',
        component: HoursFormPage
    },
    {
        path: '/planning',
        component: PlanningPage
    },
    {
        path: '/calendar',
        component: CalendarPage
    },
    {
        path: '/select-workers',
        component: WorkersPage
    },
    {
        path: '/history',
        component: HistoryPage
    },
    {
        path: '/modify-sign-in/:code/:date/:time/:concept/',
        component: ModifySignInPage,
        props: true,
    },
    {
        path: '/panel-right/',
        component: PanelRightPage,
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];
