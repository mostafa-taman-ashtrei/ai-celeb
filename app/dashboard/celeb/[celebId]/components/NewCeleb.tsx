"use client";

import * as z from "zod";

import { Category, Celeb } from "@prisma/client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PREAMBLE, SEED_CHAT } from "@/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import GradientText from "@/components/general/GradientText";
import ImageUpload from "./ImageUpload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import axios from "axios";
import { formSchema } from "./formSchema";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

interface props {
    categories: Category[];
    initialData: Celeb | null;
}

const NewCeleb: React.FC<props> = ({ initialData, categories }) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            seed: "",
            src: "",
            categoryId: undefined,
        },
    });

    const isLoading = form.formState.isSubmitting;

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData) await axios.patch(`/api/celeb/${initialData.id}`, values);
            else await axios.post("/api/celeb", values);

            toast.success(`${initialData ? "Updated Successfully" : "Celeb Created."}`);

            router.refresh();
            router.push("/dashboard");
        } catch {
            toast.error("Something went wrong ... try again later");
        }
    };

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pb-10">
                    <div className="space-y-2 w-full col-span-2">
                        <div>
                            <h3 className="text-2xl font-medium">
                                <GradientText text="General" />
                            </h3>

                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField
                        name="src"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4 col-span-2">
                                <FormControl>
                                    <ImageUpload
                                        disabled={isLoading}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Name</FormLabel>

                                    <FormDescription>
                                        This is how your AI Companion will be named.
                                    </FormDescription>

                                    <FormControl>
                                        <Input disabled={isLoading} placeholder="Albert Einstein" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>

                                    <FormDescription>
                                        Short description for your AI Companion
                                    </FormDescription>

                                    <FormControl>
                                        <Input disabled={isLoading} placeholder="Theoretical Physicist " {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>

                                    <FormDescription>
                                        Select a category for your AI
                                    </FormDescription>

                                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-background">
                                                <SelectValue defaultValue={field.value} placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-2xl font-medium">
                                <GradientText text="Configuration" />
                            </h3>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>

                    <FormField
                        name="instructions"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Instructions</FormLabel>

                                <FormDescription>
                                    Describe in detail your companion&apos;s backstory and relevant details.
                                </FormDescription>

                                <FormControl>
                                    <Textarea disabled={isLoading} rows={7} className="bg-background resize-none" placeholder={PREAMBLE} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="seed"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Example Conversation</FormLabel>

                                <FormDescription>
                                    Write couple of examples of a human chatting with your AI companion, write expected answers.
                                </FormDescription>

                                <FormControl>
                                    <Textarea disabled={isLoading} rows={7} className="bg-background resize-none" placeholder={SEED_CHAT} {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="w-full flex justify-center">
                        <Button
                            className="rounded-full"
                            size="lg"
                            variant="gradient"
                            disabled={isLoading}
                            type="submit"
                        >
                            {
                                isLoading
                                    ? <>
                                        {initialData ? "Editing ..." : "Creating ..."}
                                        <Wand2 className="w-4 h-4 ml-2 animate-bounce" />
                                    </>
                                    : <>
                                        {initialData ? "Edit your celeb" : "Create your celeb"}
                                        <Wand2 className="w-4 h-4 ml-2" />
                                    </>
                            }

                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default NewCeleb;