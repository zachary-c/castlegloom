import { urlFor } from '$/lib/image'
import { qpImage } from '$/schemaTypes/questionObjects/qpImage'

export default function PromptImage({ value }: { value: qpImage }) {

	return <img className="qp-image" src={urlFor(value.image.image.asset._ref).url()} alt="" />
}
