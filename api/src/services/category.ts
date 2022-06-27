import Category, {CategoryDocument} from '../models/Category'
import {NotFoundError} from '../helpers/apiError'


const findAll = async (): Promise<CategoryDocument[]> => {
    return Category.find().sort({name: 1})
};

const create = async (cat: CategoryDocument): Promise<CategoryDocument> => {
    return cat.save()

};

const find = async (name: string): Promise<CategoryDocument> => {
    const cat = await Category.findOne({name: name}).exec();
    if (!cat)
        throw new NotFoundError(`Category "${name}" not found`);

    return cat
};

const deleteById = async (id: string): Promise<CategoryDocument> => {
    const cat = await Category.findByIdAndDelete(id);
    if (!cat)
        throw new NotFoundError(`Category "${id}" not found`);
    return cat

};

const updateByName = async (id: string, updatedData: Partial<CategoryDocument>): Promise<CategoryDocument> => {
    const cat = await Category.findByIdAndUpdate(id, updatedData, {new: true});

    if (!cat)
        throw new NotFoundError(`Category "${id}" not found`);

    return cat;
};

export default {findAll, create, find, deleteById, updateByName}