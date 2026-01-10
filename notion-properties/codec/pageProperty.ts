import { z } from "@zod/zod";
import { type $ZodType } from "@zod/zod/v4/core";

/**
 *
 * @example
 * ```tsx
 * import { pageProperty } from './pageProperty.ts'
 * import { equal } from '@std/assert'
 * import { z } from '@zod/zod'
 *
 * const numberProperty = pageProperty('number', z.number())
 * equal(numberProperty.encode(3), { type: 'number', number: 3 })
 * equal(numberProperty.decode({ type: 'number', number: 2 }), 2)
 *
 * const complexProperty = pageProperty('thing', numberProperty)
 * equal(complexProperty.encode({ type: 'number', number: 3 }), { type: 'thing', thing: { type: 'number', number: 3 }})
 * equal(complexProperty.decode({ type: 'thing', thing: { type: 'number', number: 2 }}), 2)
 * ```
 */
export function pageProperty<const Type extends string, Codec extends $ZodType>(
	type: Type,
	codec: Codec,
) {
	const encodedType = typedObject(type, codec).and(
		z.object({ id: z.string().optional() }),
	);
	return z.codec(encodedType, codec, {
		// @ts-expect-error - horror
		decode: (prop) => prop[type],
		// @ts-expect-error - horror
		encode: (value) => ({ type, [type]: value }),
	});
}

export function typedObject<const Type extends string, Codec extends $ZodType>(
	type: Type,
	codec: Codec,
) {
	const typeLiteral = z.literal(type);
	return z.intersection(
		z.object({ type: typeLiteral }),
		z.record(typeLiteral, codec),
	);
}
