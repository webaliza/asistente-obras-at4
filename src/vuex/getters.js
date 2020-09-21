export default {
    getUserName(state) {
        return (state.usuario);
    },
    getUserID(state) {
        return (state.codigo_usuario);
    },
    getUserPass(state) {
        return (state.contrasenya);
    },
    getProjects(state) {
        return (state.obras);
    },
    getCurrentProjectCode(state) {
        return (state.current_project_code);
    },
    getCurrentChapterCode(state) {
        return (state.current_chapter_code);
    },
    getCurrentEntryCode(state) {
        return (state.current_entry_code);
    },
    getDateOfWork(state) {
        return (state.date_of_work);
    },
    getWorkersList(state) {
        return (state.workers_list);
    },
    getWorkersListBig(state) {
        return (state.workers_list_big);
    },
    getHoursType(state) {
        return (state.hours_type);
    },
    getHours(state) {
        return (state.hours);
    },
    getComments(state) {
        return (state.comments);
    },
    getHistory(state) {
        return (state.history);
    },
    getCausesList(state) {
        return (state.causes_list);
    },
};
