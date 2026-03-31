const { data, error: uploadError } = await supabase.storage
  .from("photos")
  .upload(fileName, file, {
    cacheControl: "3600",
    upsert: true
  });
