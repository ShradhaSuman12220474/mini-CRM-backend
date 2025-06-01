// export function parseRuleString(ruleStr) {
//   const tokens = ruleStr.split(/\s+/);
//   const queryParts = [];
//   let currentGroup = [];

//   const parseCondition = (field, operator, value) => {
//     if (field === "lastActive" && value.endsWith("d")) {
//       const daysAgo = parseInt(value);
//       const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
//       value = date;
//     } else if (!isNaN(value)) {
//       value = parseFloat(value);
//     }

//     switch (operator) {
//       case '>': return { [field]: { $gt: value } };
//       case '<': return { [field]: { $lt: value } };
//       case '>=': return { [field]: { $gte: value } };
//       case '<=': return { [field]: { $lte: value } };
//       case '==': return { [field]: value };
//       default: throw new Error(`Unsupported operator: ${operator}`);
//     }
//   };

//   for (let i = 0; i < tokens.length; i++) {
//     const token = tokens[i];

//     if (token === "AND") {
//       queryParts.push({ $and: currentGroup });
//       currentGroup = [];
//     } else if (token === "OR") {
//       if (currentGroup.length) {
//         queryParts.push({ $and: currentGroup });
//         currentGroup = [];
//       }
//     } else {
//       const [field, operator, value] = [tokens[i], tokens[i + 1], tokens[i + 2]];
//       currentGroup.push(parseCondition(field, operator, value));
//       i += 2;
//     }
//   }

//   if (currentGroup.length) {
//     queryParts.push({ $and: currentGroup });
//   }

//   if (queryParts.length === 1) return queryParts[0];
//   return { $or: queryParts };
// }

import dayjs from 'dayjs';

export function parseRuleString(ruleString) {
  const normalized = ruleString
    .replace(/AND/gi, '&&')
    .replace(/OR/gi, '||');

  const expressions = normalized.split(/\s*\|\|\s*/); // OR parts

  const orClauses = expressions.map(expr => {
    const andParts = expr.split(/\s*&&\s*/); // AND parts

    const andConditions = andParts.map(cond => {
      cond = cond.trim();

      if (/^spend/.test(cond)) {
        const [, op, value] = cond.match(/spend\s*(>|<|=)\s*(\d+)/);
        return { spend: { [getMongoOp(op)]: Number(value) } };
      }

      if (/^visits/.test(cond)) {
        const [, op, value] = cond.match(/visits\s*(>|<|=)\s*(\d+)/);
        return { visits: { [getMongoOp(op)]: Number(value) } };
      }

      if (/^lastActive/.test(cond)) {
        const [, op, value] = cond.match(/lastActive\s*(>|<|=)\s*(\d+)d/);
        const date = dayjs().subtract(Number(value), 'day').toDate();
        return { lastActive: { [getMongoOp(op)]: date } };
      }

      throw new Error(`Invalid condition: ${cond}`);
    });

    return andConditions.length > 1 ? { $and: andConditions } : andConditions[0];
  });

  return orClauses.length > 1 ? { $or: orClauses } : orClauses[0];
}

function getMongoOp(op) {
  return {
    '>': '$gt',
    '<': '$lt',
    '=': '$eq'
  }[op];
}

export default parseRuleString;