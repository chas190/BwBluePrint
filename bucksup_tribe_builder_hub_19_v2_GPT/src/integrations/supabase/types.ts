export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      appqbutlinks: {
        Row: {
          button_style: string | null
          button_text: string
          button_type: string
          created_at: string | null
          id: string
          link_url: string | null
          next_page: number | null
          question_id: string | null
        }
        Insert: {
          button_style?: string | null
          button_text: string
          button_type: string
          created_at?: string | null
          id?: string
          link_url?: string | null
          next_page?: number | null
          question_id?: string | null
        }
        Update: {
          button_style?: string | null
          button_text?: string
          button_type?: string
          created_at?: string | null
          id?: string
          link_url?: string | null
          next_page?: number | null
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appqbutlinks_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "appquestions"
            referencedColumns: ["id"]
          },
        ]
      }
      appqcheckboxes: {
        Row: {
          checkbox_label: string
          checkbox_name: string
          checkbox_value: string
          created_at: string | null
          id: string
          question_id: string | null
        }
        Insert: {
          checkbox_label: string
          checkbox_name: string
          checkbox_value: string
          created_at?: string | null
          id?: string
          question_id?: string | null
        }
        Update: {
          checkbox_label?: string
          checkbox_name?: string
          checkbox_value?: string
          created_at?: string | null
          id?: string
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appqcheckboxes_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "appquestions"
            referencedColumns: ["id"]
          },
        ]
      }
      appqdropdown_options: {
        Row: {
          created_at: string | null
          dropdown_id: string | null
          id: string
          option_label: string
          option_order: number | null
          option_value: string
        }
        Insert: {
          created_at?: string | null
          dropdown_id?: string | null
          id?: string
          option_label: string
          option_order?: number | null
          option_value: string
        }
        Update: {
          created_at?: string | null
          dropdown_id?: string | null
          id?: string
          option_label?: string
          option_order?: number | null
          option_value?: string
        }
        Relationships: [
          {
            foreignKeyName: "appqdropdown_options_dropdown_id_fkey"
            columns: ["dropdown_id"]
            isOneToOne: false
            referencedRelation: "appqdropdowns"
            referencedColumns: ["id"]
          },
        ]
      }
      appqdropdowns: {
        Row: {
          created_at: string | null
          dropdown_label: string
          dropdown_name: string
          id: string
          question_id: string | null
          required: boolean | null
        }
        Insert: {
          created_at?: string | null
          dropdown_label: string
          dropdown_name: string
          id?: string
          question_id?: string | null
          required?: boolean | null
        }
        Update: {
          created_at?: string | null
          dropdown_label?: string
          dropdown_name?: string
          id?: string
          question_id?: string | null
          required?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "appqdropdowns_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "appquestions"
            referencedColumns: ["id"]
          },
        ]
      }
      appqicons: {
        Row: {
          created_at: string | null
          icon_color: string | null
          icon_name: string
          id: string
          question_id: string | null
        }
        Insert: {
          created_at?: string | null
          icon_color?: string | null
          icon_name: string
          id?: string
          question_id?: string | null
        }
        Update: {
          created_at?: string | null
          icon_color?: string | null
          icon_name?: string
          id?: string
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appqicons_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "appquestions"
            referencedColumns: ["id"]
          },
        ]
      }
      appqimgs: {
        Row: {
          alt_text: string | null
          created_at: string | null
          id: string
          image_url: string
          question_id: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          question_id?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appqimgs_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "appquestions"
            referencedColumns: ["id"]
          },
        ]
      }
      appquestions: {
        Row: {
          created_at: string | null
          id: string
          main_topic: string
          page_number: number
          question_order: number
          question_text: string
          required: boolean | null
          subtopic: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          main_topic?: string
          page_number: number
          question_order: number
          question_text: string
          required?: boolean | null
          subtopic?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          main_topic?: string
          page_number?: number
          question_order?: number
          question_text?: string
          required?: boolean | null
          subtopic?: string
        }
        Relationships: []
      }
      info_group_options: {
        Row: {
          created_at: string
          group_id: string
          icon_id: string | null
          id: string
          image_id: string | null
          next_group_id: string | null
          option_order: number
          option_text: string
        }
        Insert: {
          created_at?: string
          group_id: string
          icon_id?: string | null
          id?: string
          image_id?: string | null
          next_group_id?: string | null
          option_order?: number
          option_text: string
        }
        Update: {
          created_at?: string
          group_id?: string
          icon_id?: string | null
          id?: string
          image_id?: string | null
          next_group_id?: string | null
          option_order?: number
          option_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "info_group_options_icon_id_fkey"
            columns: ["icon_id"]
            isOneToOne: false
            referencedRelation: "info_icons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "info_group_options_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "info_images"
            referencedColumns: ["id"]
          },
        ]
      }
      info_icons: {
        Row: {
          created_at: string
          icon_name: string
          icon_order: number
          icon_url: string | null
          id: string
          option_id: string
        }
        Insert: {
          created_at?: string
          icon_name: string
          icon_order?: number
          icon_url?: string | null
          id?: string
          option_id: string
        }
        Update: {
          created_at?: string
          icon_name?: string
          icon_order?: number
          icon_url?: string | null
          id?: string
          option_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "info_icons_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "info_q_options"
            referencedColumns: ["id"]
          },
        ]
      }
      info_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          image_order: number
          image_url: string
          option_id: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_order?: number
          image_url: string
          option_id: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_order?: number
          image_url?: string
          option_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "info_images_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "info_q_options"
            referencedColumns: ["id"]
          },
        ]
      }
      info_q_options: {
        Row: {
          created_at: string
          id: string
          is_correct: boolean
          option_order: number
          option_text: string
          question_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_correct?: boolean
          option_order?: number
          option_text: string
          question_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_correct?: boolean
          option_order?: number
          option_text?: string
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "info_q_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "info_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      info_question_responses: {
        Row: {
          created_at: string
          id: string
          is_default: boolean
          is_success_response: boolean
          next_question_id: string | null
          question_id: string
          response_icon_id: string | null
          response_image_id: string | null
          response_text: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_default?: boolean
          is_success_response?: boolean
          next_question_id?: string | null
          question_id: string
          response_icon_id?: string | null
          response_image_id?: string | null
          response_text: string
        }
        Update: {
          created_at?: string
          id?: string
          is_default?: boolean
          is_success_response?: boolean
          next_question_id?: string | null
          question_id?: string
          response_icon_id?: string | null
          response_image_id?: string | null
          response_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "info_question_responses_next_question_id_fkey"
            columns: ["next_question_id"]
            isOneToOne: false
            referencedRelation: "info_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "info_question_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "info_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "info_question_responses_response_icon_id_fkey"
            columns: ["response_icon_id"]
            isOneToOne: false
            referencedRelation: "info_icons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "info_question_responses_response_image_id_fkey"
            columns: ["response_image_id"]
            isOneToOne: false
            referencedRelation: "info_images"
            referencedColumns: ["id"]
          },
        ]
      }
      info_questions: {
        Row: {
          created_at: string
          group_id: string
          id: string
          image_url: string | null
          question_order: number
          question_text: string
          statement_text: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          group_id?: string
          id?: string
          image_url?: string | null
          question_order?: number
          question_text: string
          statement_text?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          image_url?: string | null
          question_order?: number
          question_text?: string
          statement_text?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      info_user_responses: {
        Row: {
          answered_at: string
          group_id: string
          id: string
          is_correct: boolean | null
          question_id: string
          selected_option_id: string | null
          user_id: string | null
        }
        Insert: {
          answered_at?: string
          group_id: string
          id?: string
          is_correct?: boolean | null
          question_id: string
          selected_option_id?: string | null
          user_id?: string | null
        }
        Update: {
          answered_at?: string
          group_id?: string
          id?: string
          is_correct?: boolean | null
          question_id?: string
          selected_option_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "info_user_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "info_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "info_user_responses_selected_option_id_fkey"
            columns: ["selected_option_id"]
            isOneToOne: false
            referencedRelation: "info_q_options"
            referencedColumns: ["id"]
          },
        ]
      }
      lookupfail: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          message: string | null
          original_lookup_parameter: string | null
          phone_number: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          message?: string | null
          original_lookup_parameter?: string | null
          phone_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          message?: string | null
          original_lookup_parameter?: string | null
          phone_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          actcalls: boolean | null
          app_name: string | null
          c_qlbuttons: boolean | null
          demo_ads: boolean | null
          id: string
          pg_name: string
          slides: boolean | null
        }
        Insert: {
          actcalls?: boolean | null
          app_name?: string | null
          c_qlbuttons?: boolean | null
          demo_ads?: boolean | null
          id?: string
          pg_name: string
          slides?: boolean | null
        }
        Update: {
          actcalls?: boolean | null
          app_name?: string | null
          c_qlbuttons?: boolean | null
          demo_ads?: boolean | null
          id?: string
          pg_name?: string
          slides?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          admin: boolean | null
          avatar_url: string | null
          bio: string | null
          corp: boolean | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          last_sign_in: string | null
          location: string | null
          master: boolean | null
          membership_type: Database["public"]["Enums"]["membership_type"] | null
          parent_profile_id: string
          phone_number: string | null
          phone_verified: boolean | null
          two_factor_enabled: boolean | null
          updated_at: string
          username: string | null
        }
        Insert: {
          admin?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          corp?: boolean | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          last_sign_in?: string | null
          location?: string | null
          master?: boolean | null
          membership_type?:
            | Database["public"]["Enums"]["membership_type"]
            | null
          parent_profile_id?: string
          phone_number?: string | null
          phone_verified?: boolean | null
          two_factor_enabled?: boolean | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          admin?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          corp?: boolean | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          last_sign_in?: string | null
          location?: string | null
          master?: boolean | null
          membership_type?:
            | Database["public"]["Enums"]["membership_type"]
            | null
          parent_profile_id?: string
          phone_number?: string | null
          phone_verified?: boolean | null
          two_factor_enabled?: boolean | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      qlb_info: {
        Row: {
          act0: string | null
          active: boolean | null
          actlink0: string | null
          b_id: string
          but_color: string | null
          but_name: string | null
          "but_text-color": string | null
          but_txt: string | null
          hide: boolean | null
          icon: string | null
          icon_color: string | null
        }
        Insert: {
          act0?: string | null
          active?: boolean | null
          actlink0?: string | null
          b_id?: string
          but_color?: string | null
          but_name?: string | null
          "but_text-color"?: string | null
          but_txt?: string | null
          hide?: boolean | null
          icon?: string | null
          icon_color?: string | null
        }
        Update: {
          act0?: string | null
          active?: boolean | null
          actlink0?: string | null
          b_id?: string
          but_color?: string | null
          but_name?: string | null
          "but_text-color"?: string | null
          but_txt?: string | null
          hide?: boolean | null
          icon?: string | null
          icon_color?: string | null
        }
        Relationships: []
      }
      qlb_view: {
        Row: {
          action0: string | null
          active: boolean | null
          b_id: string | null
          hide: boolean | null
          id: number
          level: number | null
          link0: string | null
          order: number | null
          pg_view: string | null
          public: boolean | null
        }
        Insert: {
          action0?: string | null
          active?: boolean | null
          b_id?: string | null
          hide?: boolean | null
          id?: number
          level?: number | null
          link0?: string | null
          order?: number | null
          pg_view?: string | null
          public?: boolean | null
        }
        Update: {
          action0?: string | null
          active?: boolean | null
          b_id?: string | null
          hide?: boolean | null
          id?: number
          level?: number | null
          link0?: string | null
          order?: number | null
          pg_view?: string | null
          public?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "qlb_view_b_id_fkey"
            columns: ["b_id"]
            isOneToOne: false
            referencedRelation: "qlb_info"
            referencedColumns: ["b_id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          creator_profile_id: string
          id: string
          parent_profile_id: string
          team_color: string | null
          team_id: string
          team_name: string
          team_phone: string | null
          top_team_id: string
          updated_at: string
          use_profile_phone: boolean | null
        }
        Insert: {
          created_at?: string
          creator_profile_id: string
          id?: string
          parent_profile_id?: string
          team_color?: string | null
          team_id: string
          team_name: string
          team_phone?: string | null
          top_team_id?: string
          updated_at?: string
          use_profile_phone?: boolean | null
        }
        Update: {
          created_at?: string
          creator_profile_id?: string
          id?: string
          parent_profile_id?: string
          team_color?: string | null
          team_id?: string
          team_name?: string
          team_phone?: string | null
          top_team_id?: string
          updated_at?: string
          use_profile_phone?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_creator_profile_id_fkey"
            columns: ["creator_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_responses: {
        Row: {
          completed_at: string | null
          id: string
          question_id: string | null
          response_text: string | null
          response_value: string | null
          user_visit_id: string | null
        }
        Insert: {
          completed_at?: string | null
          id?: string
          question_id?: string | null
          response_text?: string | null
          response_value?: string | null
          user_visit_id?: string | null
        }
        Update: {
          completed_at?: string | null
          id?: string
          question_id?: string | null
          response_text?: string | null
          response_value?: string | null
          user_visit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "appquestions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_responses_user_visit_id_fkey"
            columns: ["user_visit_id"]
            isOneToOne: false
            referencedRelation: "user_visits"
            referencedColumns: ["id"]
          },
        ]
      }
      user_visits: {
        Row: {
          city: string | null
          county: string | null
          created_at: string | null
          email: string | null
          first_visit: string | null
          id: string
          last_visit: string | null
          phone: string | null
          state: string | null
          updated_at: string | null
          user_id: string | null
          visit_count: number | null
          zipcode: string | null
        }
        Insert: {
          city?: string | null
          county?: string | null
          created_at?: string | null
          email?: string | null
          first_visit?: string | null
          id?: string
          last_visit?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string | null
          user_id?: string | null
          visit_count?: number | null
          zipcode?: string | null
        }
        Update: {
          city?: string | null
          county?: string | null
          created_at?: string | null
          email?: string | null
          first_visit?: string | null
          id?: string
          last_visit?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string | null
          user_id?: string | null
          visit_count?: number | null
          zipcode?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_team_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      membership_type: "member" | "founder"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      membership_type: ["member", "founder"],
    },
  },
} as const

