/** 
	统一toast提示
 
 */
const toast = (title = '', duration = 3000, mask = false, icon = 'none') => {
	uni.showToast({
		title: title.toString(),
		duration,
		mask,
		icon
	});
}

export default toast;
