import models from "../models/index.js";

export const initialData = async () => {
    await models.User.create({
        username: "rafaelghifari",
        password: "1x4%i0$To",
        name: "Admin",
        role: "Super User",
        createdBy: "rafaelghifari",
        updatedBy: "rafaelghifari"
    });

    await models.User.create({
        username: "supervisor",
        password: "1x4%i0$To",
        name: "Supervisor",
        role: "Administrator",
        createdBy: "rafaelghifari",
        updatedBy: "rafaelghifari"
    });

    await models.User.create({
        username: "client",
        password: "1x4%i0$To",
        name: "Client",
        role: "Client",
        createdBy: "rafaelghifari",
        updatedBy: "rafaelghifari"
    });
}