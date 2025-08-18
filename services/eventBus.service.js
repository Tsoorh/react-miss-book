export const eventBusService = {
  on,
  emit,
};

function on(evName, listener) {
  return addEventListener(evName,listener);
}
function emit(evName, data) {
  //

}

function showUserMsg(msg) {
  eventBusService.emit("show-user-msg", msg);
}
function showSuccessMsg(txt) {
  showUserMsg({ txt, type: "success" });
}
function showErrorMsg(txt) {
  showUserMsg({ txt, type: "error" });
}
