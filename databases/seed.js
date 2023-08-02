import models from "../models/index.js";

export const initialData = async () => {
    await models.User.create({
        username: "rafaelghifari",
        password: "1x4%i0$To",
        name: "Rafael Ghifari",
        role: "Super User",
        createdBy: "rafaelghifari",
        updatedBy: "rafaelghifari"
    });

    await models.User.create({
        username: "heffi",
        password: "heffi01",
        name: "Heffi Heriyanto",
        role: "Administrator",
        createdBy: "rafaelghifari",
        updatedBy: "rafaelghifari"
    });

    await models.User.create({
        username: "warsan",
        password: "warsan01",
        name: "Warsan",
        role: "Administrator",
        createdBy: "rafaelghifari",
        updatedBy: "rafaelghifari"
    });

    await models.User.create({
        username: "santong",
        password: "santong01",
        name: "Santong",
        role: "Administrator",
        createdBy: "rafaelghifari",
        updatedBy: "rafaelghifari"
    });

    await models.User.create({
        username: "josmer",
        password: "josmer01",
        name: "josmer",
        role: "Client",
        createdBy: "rafaelghifari",
        updatedBy: "rafaelghifari"
    });
}