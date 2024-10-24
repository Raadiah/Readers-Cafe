const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

const formatDate = (dateString) => {
    const date = new Date(dateString);
    let day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    if(day<10) day = '0' + day

    return `${day} ${month.slice(0, 3)} ${year}`
}

export default formatDate