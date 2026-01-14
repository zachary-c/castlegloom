import { urlFor } from '$/lib/image'
import { qpImage } from '$/schemaTypes/questionObjects/qpImage'
import Image from 'next/image'

export default function PromptImage({ value }: { value: qpImage }) {

	console.log(value)
	return <img className="qp-image" src={urlFor(value.image.image.asset._ref).url()} alt="" />

}
