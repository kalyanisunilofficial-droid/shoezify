

export function TranslateAction(props: any) {
  const { draft, published, patch, onComplete } = props;
  const doc = draft || published;

  return {
    label: "Translate",
    onHandle: async () => {
      if (!doc) return;

      // 👇 THIS IS WHERE YOUR CODE IS USED
      const { patchUpdates } = await autoTranslateField(
        doc,
        "content",        // field name
        "en",             // source language
        ["hi", "ml"],     // target languages
        "product"         // page type
      );

      patch.execute(
        Object.entries(patchUpdates).map(([path, value]) => ({
          set: { [path]: value },
        }))
      );

      onComplete();
    },
  };
}

function autoTranslateField(doc: any, arg1: string, arg2: string, arg3: string[], arg4: string): { patchUpdates: any; } | PromiseLike<{ patchUpdates: any; }> {
    throw new Error("Function not implemented.");
}

