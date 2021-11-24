class BRNotification {
  constructor(name, component) {
    this.name = name
    this.component = component
    this.menuBtns = component.querySelectorAll('.contextual-btn')
    this.hideEvents = ['mouseleave', 'blur']
  }

  _hideNotification(action) {
    const notification = action.parentNode.parentNode
    notification.setAttribute('hidden', '')
  }

  _hideAllNotifications(action) {
    const notifications =
      action.parentNode.parentNode.parentNode.querySelectorAll('.br-item')
    notifications.forEach((notification) => {
      notification.setAttribute('hidden', '')
    })
  }
}
const notificationList = []
for (const brNotification of window.document.querySelectorAll(
  '.br-notification'
)) {
  notificationList.push(new BRNotification('br-notification', brNotification))
}
export default BRNotification
