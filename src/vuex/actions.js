// actions.js
import {
    SET_USER_NAME,
    SET_USER_ID,
    SET_USER_PASS,
    SET_PROJECTS,
    SET_CURRENT_PROJECT_CODE,
    SET_CURRENT_CHAPTER_COODE,
    SET_CURRENT_ENTRY_CODE,
    SET_DATE_OF_WORK,
    SET_WORKERS_LIST,
    SET_WORKERS_LIST_BIG,
    SET_HOURS_TYPE,
    SET_HOURS,
    SET_COMMENTS,
    SET_HISTORY,
    SET_CAUSES_LIST,
} from './mutations';

export default {
    setUserName({commit}, userName) {
        commit(SET_USER_NAME, userName);
    },
    setUserID({commit}, userID) {
        commit(SET_USER_ID, userID);
    },
    setUserPass({commit}, userPass) {
        commit(SET_USER_PASS, userPass);
    },
    setProjects({commit}, projects) {
        delete projects.usuario_valido;
        commit(SET_PROJECTS, projects);
    },
    setCurrentProjectCode({commit}, projectCode) {
        commit(SET_CURRENT_PROJECT_CODE, projectCode);
    },
    setCurrentChapterCode({commit}, chapterCode) {
        commit(SET_CURRENT_CHAPTER_COODE, chapterCode);
    },
    setCurrentEntryCode({commit}, entryCode) {
        commit(SET_CURRENT_ENTRY_CODE, entryCode);
    },
    setDateOfWork({commit}, date) {
        commit(SET_DATE_OF_WORK, date);
    },
    setWorkersList({commit}, workers_list) {
        commit(SET_WORKERS_LIST, workers_list);
    },
    setWorkersListBig({commit}, workers_list_big) {
        commit(SET_WORKERS_LIST_BIG, workers_list_big);
    },
    setHoursType({commit}, hours_type) {
        commit(SET_HOURS_TYPE, hours_type);
    },
    setHours({commit}, hours) {
        commit(SET_HOURS, hours);
    },
    setComments({commit}, comments) {
        commit(SET_COMMENTS, comments);
    },
    setHistory({commit}, history) {
        commit(SET_HISTORY, history);
    },
    setCausesList({commit}, causes_list) {
        commit(SET_CAUSES_LIST, causes_list);
    },
};
