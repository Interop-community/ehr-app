/**
 * Given a patient returns his name
 * @export
 * @param {Fhir.Patient} patient
 * @returns {string}
 */
import moment from "moment";

export function getPatientName(patient) {
    const names = patient.name;

    if (!names || !names.length) {
        return "";
    }

    // if multiple names exist pick the most resent one and prefer official names
    if (names.length > 1) {
        names.sort((a, b) => {
            let score = 0;

            if (a.period && a.period.end && b.period && b.period.end) {
                const endA = moment(a.period.end);
                const endB = moment(b.period.end);
                score = endA.valueOf() - endB.valueOf();
            }

            if (a.use === "official") {
                score += 1;
            }

            if (b.use === "official") {
                score -= 1;
            }

            return score;
        });
    }

    const name = names[names.length - 1];
    const out = [];

    if (Array.isArray(name.prefix)) {
        out.push(name.prefix.join(" "));
    }

    if (Array.isArray(name.given)) {
        out.push(name.given.join(" "));
    }

    if (Array.isArray(name.family)) {
        out.push(name.family.join(" "));
    } else {
        out.push(name.family);
    }

    if (Array.isArray(name.suffix)) {
        out.push(name.suffix.join(" "));
    }

    return out.join(" ");
}
