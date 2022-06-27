import Brand, {BrandDocument} from '../models/Brand'
import {BadRequestError, NotFoundError} from '../helpers/apiError'

const findAll = async (): Promise<BrandDocument[]> => {
    return Brand.find().sort({name: 1})
};

const create = async (brand: BrandDocument): Promise<BrandDocument> => {
    const brandName = brand.name;
    const count = await Brand.countDocuments({name: brandName});

    if (count > 0)
        throw new BadRequestError(`Brand name already registered`)

    return brand.save()
};

const find = async (name: string): Promise<BrandDocument> => {
    const brand = await Brand.findOne({name: name}).exec();
    if (!brand)
        throw new NotFoundError(`Brand with name "${name}" not found`);

    return brand
};

const deleteById = async (id: string): Promise<BrandDocument> => {
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand)
        throw new NotFoundError(`Brand "${id}" not found`);
    return brand

};

const updateByName = async (id: string, updatedData: Partial<BrandDocument>): Promise<BrandDocument> => {
    const brand = await Brand.findByIdAndUpdate(id, updatedData, {new: true});
    if (!brand)
        throw new NotFoundError(`Brand "${id}" not found`);

    return brand;
};

export default {findAll, create, find, deleteById, updateByName}