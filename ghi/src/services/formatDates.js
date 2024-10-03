export default function formatDate(date) {
    return date.datetoLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}
